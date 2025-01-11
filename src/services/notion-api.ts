const NOTION_API_KEY = process.env.EXPO_PUBLIC_NOTION_API_KEY;
const NOTION_PAGE_ID = process.env.EXPO_PUBLIC_NOTION_PAGE_ID;
const NOTION_API_URL = "https://api.notion.com/v1";

if (!NOTION_API_KEY) {
  throw new Error("NOTION_API_KEY is not defined in environment variables");
}

if (!NOTION_PAGE_ID) {
  throw new Error("NOTION_PAGE_ID is not defined in environment variables");
}

export interface NotionBlock {
  type: string;
  content: string;
  url?: string;
  language?: string;
}

export interface NotionPage {
  title: string;
  blocks: NotionBlock[];
  coverImage?: string;
}

async function fetchNotion(endpoint: string) {
  const response = await fetch(`${NOTION_API_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Notion API error: ${response.statusText}`);
  }

  return response.json();
}

interface NotionBlockResponse {
  type: string;
  [key: string]: any;
}

function extractBlockContent(block: NotionBlockResponse): NotionBlock | null {
  try {
    switch (block.type) {
      case "paragraph":
        if (!block.paragraph?.rich_text?.length) return null;
        return {
          type: "text",
          content: block.paragraph.rich_text.map((text: any) => text.plain_text).join(""),
        };

      case "image":
        return {
          type: "image",
          content: block.image?.caption?.[0]?.plain_text || "",
          url: block.image?.file?.url || block.image?.external?.url,
        };

      case "code":
        if (!block.code?.rich_text?.length) return null;
        return {
          type: "code",
          content: block.code.rich_text.map((text: any) => text.plain_text).join(""),
          language: block.code.language || "plaintext",
        };

      case "heading_1":
      case "heading_2":
      case "heading_3":
        const heading = block[block.type];
        if (!heading?.rich_text?.length) return null;
        return {
          type: block.type,
          content: heading.rich_text.map((text: any) => text.plain_text).join(""),
        };

      case "bulleted_list_item":
      case "numbered_list_item":
        if (!block[block.type]?.rich_text?.length) return null;
        return {
          type: block.type,
          content: block[block.type].rich_text.map((text: any) => text.plain_text).join(""),
        };

      default:
        return null;
    }
  } catch (error) {
    console.error("Error extracting block content:", error);
    return null;
  }
}

export async function getPageContent(pageId: string = NOTION_PAGE_ID): Promise<NotionPage> {
  try {
    // Fetch page metadata
    const page = await fetchNotion(`/pages/${pageId}`);

    // Fetch page blocks
    const blocksResponse = await fetchNotion(`/blocks/${pageId}/children?page_size=100`);

    const content = blocksResponse.results
      .map(extractBlockContent)
      .filter((block): block is NotionBlock => block !== null);

    const title = page.properties?.title?.title?.[0]?.plain_text || "Untitled";
    const coverImage = page.cover?.external?.url || page.cover?.file?.url;

    return {
      title,
      blocks: content,
      coverImage,
    };
  } catch (error) {
    console.error("Error fetching Notion content:", error);
    throw error;
  }
}

export async function getDatabase(databaseId: string): Promise<any[]> {
  try {
    const response = await fetchNotion(`/databases/${databaseId}/query`);
    return response.results;
  } catch (error) {
    console.error("Error fetching Notion database:", error);
    throw error;
  }
}
