import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
// import SettingsIcon from '@material-ui/icons/Settings';
// import GroupAddIcon from '@material-ui/icons/GroupAdd';
// import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import BookIcon from '@material-ui/icons/Book';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import DialpadIcon from '@material-ui/icons/Dialpad';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// import Book from './Book';
// import Part from './Part';
// import Section from './Section';
import StepCustom from './StepCustom';

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed, icon } = props;

  const icons = {
    1: <BookIcon />,
    2: <BookmarksIcon />,
    3: <CalendarViewDayIcon />,
    4: <CollectionsBookmarkIcon />,
    5: <DialpadIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  typography: {
    padding: theme.spacing(2),
  },
  alignItemsAndJustifyContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

function getSteps(view) {
  if (view === 'mechanism') {
    return ['КНИГА', 'РАЗДЕЛ', 'ГРУППА', 'ПОЗИЦИЯ'];
  }
  return ['КНИГА', 'ЧАСТЬ', 'РАЗДЕЛ', 'ГРУППА', 'ПОЗИЦИЯ'];
}

export default function CustomizedSteppers(props) {
  const {
    resourseOnly,
    // getAllBooksWithRelation,
    setNotify,
    view,
    // equipmentOnly,
    // mechanismOnly,
  } = props;

  const [book, setBook] = useState(null); // object
  const [part, setPart] = useState(null); // object
  const [section, setSection] = useState(null); // object
  const [group, setGroup] = useState(null); // object
  const [position, setPosition] = useState(null); // object
  // const [disabledNext, setDisabledNext] = useState(true);

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps(view);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setBook(null);
    setPart(null);
    setSection(null);
    setGroup(null);
    setPosition(null);
    setActiveStep(0);
  };

  const Book = ({ services }) => {
    const { getAllService, addService } = services;

    return (
      <StepCustom
        label="Выберите Книгу"
        name="book"
        getAllService={getAllService}
        addService={addService}
        setItem={setBook}
        // setDisabledNext={setDisabledNext}
        setNotify={setNotify}
        handleNext={handleNext}
      />
    );
  };

  Book.propTypes = {
    services: PropTypes.object,
    // addService: PropTypes.func,
  };

  const Part = ({ services }) => {
    const { getAllService, addService } = services;

    return (
      <StepCustom
        label="Выберите Часть"
        name="part"
        relatedFieldItem={book}
        relatedField={`book_${view}`}
        getAllService={getAllService}
        addService={addService}
        setItem={setPart}
        // setDisabledNext={setDisabledNext}
        setNotify={setNotify}
        handleNext={handleNext}
      />
    );
  };

  Part.propTypes = {
    services: PropTypes.object,
    // addService: PropTypes.func,
  };

  const Section = ({ services }) => {
    const { getAllService, addService } = services;

    return (
      <StepCustom
        label="Выберите Раздел"
        name="section"
        relatedFieldItem={part}
        relatedField={`part_${view}`}
        getAllService={getAllService}
        addService={addService}
        setItem={setSection}
        // setDisabledNext={setDisabledNext}
        setNotify={setNotify}
        handleNext={handleNext}
      />
    );
  };

  Section.propTypes = {
    services: PropTypes.object,
    // addService: PropTypes.func,
  };

  const Group = ({ services }) => {
    const { getAllService, addService } = services;

    return (
      <StepCustom
        label="Выберите Группу"
        name="group"
        relatedFieldItem={section}
        relatedField={`section_${view}`}
        getAllService={getAllService}
        addService={addService}
        setItem={setGroup}
        // setDisabledNext={setDisabledNext}
        setNotify={setNotify}
        handleNext={handleNext}
      />
    );
  };

  Group.propTypes = {
    services: PropTypes.object,
    // addService: PropTypes.func,
  };

  const Position = ({ services }) => {
    const { getAllService, addService, unit } = services;

    return (
      <StepCustom
        label="Выберите Группу"
        name="position"
        relatedFieldItem={group}
        relatedField={`group_${view}`}
        getAllService={getAllService}
        addService={addService}
        setItem={setPosition}
        // setDisabledNext={setDisabledNext}
        setNotify={setNotify}
        handleNext={handleNext}
        unit={unit}
      />
    );
  };

  Position.propTypes = {
    services: PropTypes.object,
    // addService: PropTypes.func,
  };

  function getStepContent(step) {
    const {
      bookClassifierServices,
      partClassifierServices,
      sectionClassifierServices,
      groupClassifierServices,
      positionClassifierServices,
    } = resourseOnly;

    if (view === 'mechanism') {
      switch (step) {
        case 0:
          return (
            <Book services={bookClassifierServices} />
          );
        case 1:
          return (
            <Section services={sectionClassifierServices} />
          );
        case 2:
          return (
            <Group services={groupClassifierServices} />
          );
        case 3:
          return (
            <Position services={positionClassifierServices} withUnit />
          );
        default:
          return 'Unknown step';
      }
    } else {
      switch (step) {
        case 0:
          return (
            <Book services={bookClassifierServices} />
          );
        case 1:
          return (
            <Part services={partClassifierServices} />
          );
        case 2:
          return (
            <Section services={sectionClassifierServices} />
          );
        case 3:
          return (
            <Group services={groupClassifierServices} />
          );
        case 4:
          return (
            <Position services={positionClassifierServices} withUnit />
          );
        default:
          return 'Unknown step';
      }
    }
  }

  const CustomTypo = ({ itemState, itemNameRu, step }) => {
    const fontWeight = activeStep === step ? { fontWeight: 600 } : {};
    return (
      <Typography style={fontWeight}>
        {itemNameRu}
        :
        {' '}
        {itemState && itemState.__str__}
      </Typography>
    );
  };

  CustomTypo.propTypes = {
    itemState: PropTypes.object,
    itemNameRu: PropTypes.string,
    step: PropTypes.number,
  };

  return (
    <div className={classes.root}>
      <CustomTypo itemState={book} itemNameRu="Книга" step={0} />
      <CustomTypo itemState={part} itemNameRu="Часть" step={1} />
      <CustomTypo itemState={section} itemNameRu="Раздел" step={2} />
      <CustomTypo itemState={group} itemNameRu="Группа" step={3} />
      <CustomTypo itemState={position} itemNameRu="Позиция" step={4} />
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label} onClick={() => console.log('step clicked')}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              Все этапы пройдены
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              На начало
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions} component="div">
              {getStepContent(activeStep)}
            </Typography>
            <div className={classes.alignItemsAndJustifyContent}>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Назад
              </Button>
              {/* <Button
                disabled={disabledNext}
                variant="contained"
                color="secondary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

CustomizedSteppers.propTypes = {
  resourseOnly: PropTypes.object,
  // getAllBooksWithRelation: PropTypes.func,
  setNotify: PropTypes.func,
  view: PropTypes.string,
};
