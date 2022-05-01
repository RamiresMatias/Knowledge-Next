import Layout from "../components/template/Layout"


export default function Home() {

  const treeData = [
    {
      key: 'tec',
      label: 'Tecnologia',
      nodes: [
        {
          key: 'react',
          label: 'React',
        },
      ],
    },
    {
      key: 'node-2',
      label: 'Samba dsfgdfgdfgdf',
      nodes: [
        {
          key: 'react',
          label: 'React',
        },
      ]
    },
  ];

  function clickCategoryMenu({key, label}) {
    console.log(key);
    console.log(label);
  } 

  return (
    <Layout title="Página Inicial" subtitle="Template Admin">

    </Layout>
  )
}
