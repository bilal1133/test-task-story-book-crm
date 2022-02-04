export interface QuickLinksProps {
  quickLinksStructureList: Array<{
    [key: string]: string; // we expect one key to equal "COMPONENT"
  }>;
}
