export function isLinkActive(currentUrl: string, linkUrl: string) {
  return currentUrl === '/' ? currentUrl === linkUrl : currentUrl.includes(linkUrl) && linkUrl !== '/';
}
