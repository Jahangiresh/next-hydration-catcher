import { JSDOM } from "jsdom";

export interface HydrationError {
  message: string;
  location: string;
}

export function checkHydration(html: string): HydrationError[] {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const errors: HydrationError[] = [];

  function traverse(node: any) {
    if (
      node.tagName === "DIV" &&
      node.parentElement &&
      (node.parentElement.tagName === "P" ||
        node.parentElement.tagName === "SPAN")
    ) {
      errors.push({
        message: "Hydration Error: Found <div> inside <p> or <span> tag.",
        location: node.outerHTML,
      });
    }

    if (
      (node.tagName === "P" || node.tagName === "SPAN") &&
      node.parentElement &&
      node.parentElement.tagName === "DIV"
    ) {
      errors.push({
        message: `Hydration Error: Found <${node.tagName.toLowerCase()}> inside <div> tag.`,
        location: node.outerHTML,
      });
    }

    if (
      node.tagName === "SPAN" &&
      node.parentElement &&
      node.parentElement.tagName === "P"
    ) {
      errors.push({
        message: "Hydration Error: Found <span> inside <p> tag.",
        location: node.outerHTML,
      });
    }

    if (
      (node.tagName === "A" || node.tagName === "BUTTON") &&
      node.parentElement &&
      node.parentElement.tagName === "P"
    ) {
      errors.push({
        message: `Hydration Error: Found <${node.tagName.toLowerCase()}> inside <p> tag.`,
        location: node.outerHTML,
      });
    }
    if (node.childNodes) {
      node.childNodes.forEach(traverse);
    }
  }

  traverse(document);

  return errors;
}
