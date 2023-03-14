## JSON Viewer

One pretty json viewer by javascript. Extend from package [json-viewer-js](https://github.com/renhongl/json-viewer-js)
Fix some issues and rewrite in TypeScript.

Home page: [json-viewer-ts](https://github.com/zouyi100/json-viewer-ts)

## Example

```ts
import JsonViewer from './JsonViewer';

const testObj = {
  example1: [
    {
      name: 'test01',
      age: 18,
      gender: 0,
      student: true,
      children: null,
    },
    {
      name: 'test02',
      age: 19,
      gender: 1,
      student: true,
      children: null,
    },
  ],
  example2: {
    friuts: ['apple', 'grape', 'jujube', 'pear'],
    transport: ['taxi', 'bus', 'metro', 'plane', 'train'],
  },
};

new JsonViewer({
  container: document.body,
  data: testObj,
  theme: 'light',
  expand: false,
});
```

## Output Example

The same with its parent package.

Light theme

![](https://renhongl.github.io/images/s2.png)

Dark theme

![](https://renhongl.github.io/images/s1.png)

## API Reference

| Name      | Type       | Desc                                      | Default | Required |
| --------- | ---------- | ----------------------------------------- | ------- | -------- |
| container | DOM Object | DOM element                               | null    | true     |
| data      | any        | Json object for render                    | '{}'    | true     |
| theme     | String     | Config for different theme(light or dark) | light   | false    |
| expand    | Boolean    | Config for if expand when loaded          | false   | false    |

## End

If you like it, please give me and its parent package a star, thanks!
