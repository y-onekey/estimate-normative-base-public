import React from 'react';
import Tree from 'react-d3-tree';

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
const orgChart = {
  name: 'СНБТ',
  children: [
    {
      name: 'ГКСРТ',
      // attributes: {
      //   department: 'строительных ресурсов',
      // },
      children: [
        {
          name: 'Материалы',
        },
        {
          name: 'Оборудования',
        },
        {
          name: 'Механизмы',
        },
      ],
    },
    {
      name: 'ГЭСНТ',
      // attributes: {
      //   department: 'Assembly',
      // },
      children: [
        {
          name: 'Строительные работы и спец. строительные работы',
        },
        {
          name: 'Ремонтно-строительные работы',
        },
        {
          name: 'Монтаж оборудования',
        },
        {
          name: 'Кап. ремонт оборудования',
        },
        {
          name: 'Пусконаладочные работы',
        },
      ],
    },
    {
      name: 'Мониторинг',
      // attributes: {
      //   department: 'Assembly',
      // },
      children: [
        {
          name: 'Материалы',
          children: [
            {
              name: 'Местные',
            },
            {
              name: 'Ввозимые',
            },
          ],
        },
        {
          name: 'Оборудования',
        },
        {
          name: 'Механизмы',
          children: [
            {
              name: 'Банк механизмов',
            },
            {
              name: 'Калькуляция механизмов',
            },
          ],
        },
      ],
    },
    {
      name: 'Перевозка',
      children: [
        {
          name: 'Автомобильным транспортом',
        },
        {
          name: 'Ж/д транспортом',
        },
      ]
    },
    {
      name: 'ЕТКС',
    },
  ],
};

export default function OrgChartTree() {
  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div id="treeWrapper" style={{ width: '250em', height: '150em' }}>
      <Tree data={orgChart} />
    </div>
  );
}
