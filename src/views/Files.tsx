export function convertDownloadLinkToUtf8(downloadLink: string): string {
    const decodedLink = decodeURIComponent(downloadLink);
    const url = new URL(decodedLink);
    const fileName = decodeURIComponent(url.pathname.split("/").pop() || "");
    return fileName;
}
