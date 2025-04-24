import JsonViewer from './JsonViewer';

const testJson: any = {
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

const jsonViewer = new JsonViewer({
  container: document.getElementById('tt') as HTMLElement,
  theme: 'light',
  data: testJson,
  expand: true,
});

function updateJsonObj() {
  jsonViewer.setData({test: 1, good: 'morning'})
}

// Add this code to attach the event listener
document.addEventListener('DOMContentLoaded', () => {
  const updateButton = document.querySelector('button');
  if (updateButton) {
    updateButton.addEventListener('click', updateJsonObj);
  }
});
