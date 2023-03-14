import './style.css';
export interface IJSONViewerOptions {
    theme?: 'light' | 'dark';
    container: HTMLElement;
    data: any;
    expand?: boolean;
}
export default class JsonViewer {
    private theme?;
    private container;
    private data;
    private expand?;
    constructor(option: IJSONViewerOptions);
    private _render;
    private _createItem;
    private _toggleItem;
    private _renderChildren;
    private _parse;
    private _renderRight;
}
//# sourceMappingURL=JsonViewer.d.ts.map