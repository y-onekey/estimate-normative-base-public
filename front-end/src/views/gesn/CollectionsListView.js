import React, { useState, useEffect } from 'react';
import GesnService from 'src/services/gesn_service';
import { useParams } from 'react-router-dom';
import { BookOpen } from 'react-feather';
import Cards from 'src/components/cards';
import Dialogs from 'src/components/dialogs';
import ListView from './ListView';
import Tree from './Tree/Tree';
import { MAINTEXT } from './BaseCollectionsListView';

const View = () => {
  const params = useParams();
  console.log('params', params);

  const { getBaseCollection, getCollection } = new GesnService();
  const [collections, setCollections] = useState([]);

  const getService = () => getBaseCollection(params.pk);

  const transformData = (data) => {
    // eslint-disable-next-line no-shadow
    const { collections, color, title } = data;
    return collections.map((collection) => ({
      id: collection.id,
      title: `Сборник ${collection.code}`,
      name: collection.name,
      helpText: title,
      color,
    }));
  };

  useEffect(() => {
    getService()
      .then((res) => {
        console.log('resssss.dataaa', res.data);
        setCollections(transformData(res.data));
      })
      .catch((err) => console.log(err));
  }, []);

  const renderOneItem = (bc) => {
    return (
      <Cards.CardWithIcon
        key={bc.id}
        title={bc.title}
        subTitle={`${MAINTEXT} на ${bc.name}`}
        helpText={bc.helpText ? bc.helpText : 'Книги ?-??'}
        icon={<BookOpen />}
        color={bc.color}
        buttonProp={(
          <Dialogs.ScrollPaperDialog title="Просмотреть дерево">
            <Tree
              view="material"
              selectedId={bc.id}
              getAllWithRelationService={getCollection}
            />
          </Dialogs.ScrollPaperDialog>
        )}
      />
    );
  };

  return (
    <ListView
      collections={collections}
      renderOneItem={renderOneItem}
    />
  );
};

export default View;
