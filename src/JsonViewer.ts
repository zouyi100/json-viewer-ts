import './style.css';

export interface IJSONViewerOptions {
  theme?: 'light' | 'dark';
  container: HTMLElement;
  data: any;
  expand?: boolean;
}

export default class JsonViewer {
  private theme?: 'light' | 'dark';
  private container: HTMLElement;
  private data: any;
  private expand?: boolean = false;

  constructor(option: IJSONViewerOptions) {
    const { theme, container, data, expand } = option;
    this.theme = theme ?? 'light';
    this.container = container;
    this.expand = expand ?? false;

    if (!this.container || !(container instanceof HTMLElement)) {
      throw new Error('HTMLElement Container is required');
    }

    try {
      this.data = JSON.parse(JSON.stringify(data));
    } catch {
      throw new Error('Invalid JSON Format');
    }

    debugger;
    this._render();
  }

  private _render() {
    this.container.classList.add(`jv-${this.theme}-con`);
    const type = this.data instanceof Array<any> ? 'Array' : 'Object';
    const { left, right } = this._createItem(this.container, type);
    this._renderChildren(type, this.data, right, left);
  }

  private _createItem(parent: HTMLElement, key: string, isBasicType: boolean = false) {
    const current = document.createElement('div');
    const left = document.createElement('div');
    const right = document.createElement('div');
    const wrap = document.createElement('div');

    left.innerHTML = `${key}<span class="jv-${this.theme}-symbol">&nbsp;:&nbsp;</span>`;
    if (isBasicType) {
      current.appendChild(wrap);
      current.classList.add(`jv-${this.theme}-current`);
      left.classList.add(`jv-${this.theme}-left`);
      wrap.appendChild(left);
      wrap.appendChild(right);
      wrap.classList.add(`jv-wrap`);
      parent.appendChild(current);
    } else {
      left.classList.add(`jv-${this.theme}-left`, 'jv-folder');
      current.appendChild(left);
      current.appendChild(right);
      current.classList.add(`jv-${this.theme}-current`);
      parent.appendChild(current);
      left.onclick = (e) => {
        let nextSibling = (e.target as HTMLElement).nextSibling as HTMLElement;
        this._toggleItem(nextSibling, (e.target as HTMLElement).querySelector('span'));
      };
    }

    return { left, right, current };
  }

  private _toggleItem(ele: HTMLElement, target: HTMLElement) {
    if (ele && target) {
      ele.classList.toggle('add-height');
      target.classList.toggle('rotate90');
    }
  }

  private _renderChildren(key: string, data: any, right: HTMLElement, left: HTMLElement) {
    const folder = document.createElement('span');
    folder.classList.add(`jv-${this.theme}-folder`);

    folder.onclick = (e) => {
      let nextSibling = (e.target as HTMLElement).parentNode.nextSibling as HTMLElement;
      this._toggleItem(nextSibling, e.target as HTMLElement);
    };

    let len = 0;
    if (data instanceof Array<any>) {
      len = data.length;
      left.innerHTML = `${key}&nbsp;&nbsp[${len}]`;
    } else {
      len = Object.keys(data).length;
      left.innerHTML = `${key}&nbsp;&nbsp{${len}}`;
    }
    left.prepend(folder);
    right.classList.add(`jv-${this.theme}-rightObj`);

    if (this.expand) {
      folder.classList.add('rotate90');
      right.classList.add('add-height');
    }
    this._parse(data, right);
  }

  private _parse(data: any, parent: HTMLElement) {
    if (data instanceof Array<any>) {
      data.forEach((item: any, i: number) => {
        const isBasicType = item === null || item === undefined || typeof item !== 'object';
        const { left, right } = this._createItem(parent, `${i}`, isBasicType);
        if (isBasicType) {
          this._renderRight(right, item);
        } else {
          this._renderChildren(`${i}`, item, right, left);
        }
      });
    } else {
      Object.keys(data).forEach((key) => {
        const val = data[key];
        const isBasicType = val === null || val === undefined || typeof val !== 'object';
        const { left, right } = this._createItem(parent, key, isBasicType);
        if (isBasicType) {
          this._renderRight(right, val);
        } else {
          this._renderChildren(key, val, right, left);
        }
      });
    }
  }

  private _renderRight(right: HTMLElement, data: any) {
    if (data === null) {
      right.classList.add(`jv-${this.theme}-rightnull`);
      right.innerHTML = 'null';
    } else {
      const type = typeof data;
      right.classList.add(`jv-${this.theme}-right${type}`);
      right.innerHTML = data;
    }
  }
}
