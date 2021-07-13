import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import GesnService from 'src/services/gesn_service';
import { Navigate } from 'react-router-dom';
import { BookOpen } from 'react-feather';
import Cards from 'src/components/cards';
import Controls from 'src/components/controls';
import ListView from './ListView';

export const MAINTEXT = 'Государственные элементные сметные нормы';

const View = () => {
  const [redirect, setRedirect] = useState({
    status: false,
    to: null,
  });
  const { getAllBaseCollections } = new GesnService();

  const [collections, setCollections] = useState([]);

  useEffect(() => {
    getAllBaseCollections()
      .then((res) => {
        console.log('resssss.dataaa', res.data);
        setCollections(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (redirect.status) {
    return <Navigate to={redirect.to} />;
  }

  const onHandleShow = (id) => setRedirect({
    status: true,
    to: `${id}`
  });

  const renderOneItem = (bc) => {
    return (
      <Cards.CardWithIcon
        key={bc.id}
        title={bc.title}
        subTitle={`${MAINTEXT} на ${bc.name}`}
        helpText={bc.helpText ? bc.helpText : 'Книги ?-??'}
        icon={<BookOpen />}
        color={bc.color}
        // showAction={() => onHandleShow(bc.id)}
        buttonProp={(
          <Controls.Button
            text="ПРОСМОТР"
            variant="text"
            size="medium"
            onClick={() => onHandleShow(bc.id)}
          />
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
