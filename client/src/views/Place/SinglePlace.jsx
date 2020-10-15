import React, { useState, useEffect, useContext, useRef } from 'react';
import ReactCSSTransitionGroup from 'react-transition-group';
import { Link } from 'react-router-dom';
import { loadPlace } from './../../services/place';
import SinglePlaceMap from './../../components/Map/SinglePlaceMap';
import getHours from 'date-fns/getHours';
import PlaceInfoWithCarousel from './../../components/Place/PlaceInfoWithCarousel';
import Owner from './../../components/Profile/Owner';

import SupportGrid from './../../components/Support/SupportGrid';
import SupportFromUser from './../../components/Support/SupportFromUser';
import SupportForm from '../../components/Form/SupportForm';
import PlaceSupportSection from '../../components/Support/PlaceSupportSection';

import Modal from '../../components/Modal/Modal';

import { UserContext } from '../../components/Context/UserContext';
import useOnClick from '../../hooks/useOnClick';

const { utcToZonedTime } = require('date-fns-tz');
// import parse from 'date-fns/parse';

const SinglePlace = props => {
  const [loaded, setLoaded] = useState(false);
  const [place, setPlace] = useState(null);
  const [supportContent, setSupportContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    const { id } = props.match.params;
    loadPlace(id).then(data => {
      setPlace(data.place);
      setLoaded(true);
    });
  };

  const getSupport = () => {};

  let openTime, closeTime;

  if (place?.schedule.time.openTime) {
    openTime = getHours(
      utcToZonedTime(place.schedule.time.openTime, 'Europe/Lisbon')
    );
  }
  if (place?.schedule.time.closeTime) {
    closeTime = getHours(
      utcToZonedTime(place.schedule.time.closeTime, 'Europe/Lisbon')
    );
  }

  // Setting support conditionals
  const supportsWithCommentsExist = place?.supports.some(
    support => support.content
  );
  const supportsWithoutCommentsExist = place?.supports.some(
    support => !support.content
  );

  const placesWithComments = place?.supports
    .filter(support => support.content)
    .map(support => <SupportFromUser support={support} key={support._id} />);

  const supported = place?.supports.some(
    support => support.creator._id === user._id
  );

  // Modal
  const ref = useRef();
  useOnClick(ref, () => setShowModal(false));

  return (
    <div className="place-page">
      {loaded && (
        <>
          <PlaceInfoWithCarousel place={place} />
          <section className="owner-section flex-center-both flex-v">
            <h2 className="heading heading--2 u-margin-bottom-xsmall">
              Meet the owners
            </h2>
            <Owner place={place} />
          </section>
          <SinglePlaceMap place={place} />
          <section className="support-section">
            {place.supports.length > 0 && (
              <>
                <h2 className="heading heading--2 u-margin-bottom-xsmall">
                  Supported by locals!
                </h2>
                {supportsWithCommentsExist && (
                  <div className="flex-center-both flex-v">
                    {placesWithComments}
                  </div>
                )}
                {supportsWithoutCommentsExist && (
                  <section className="flex-center-both flex-v supports">
                    <SupportGrid place={place} />
                  </section>
                )}
              </>
            )}
          </section>
          {user && place.owner._id !== user._id && (
            <PlaceSupportSection
              supported={supported}
              place={place}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          )}
          <Modal modalRef={ref} show={showModal}>
            <SupportForm
              place={place}
              supported={supported}
              setModal={setShowModal}
            />
          </Modal>
        </>
      )}
    </div>
  );
};

export default SinglePlace;
