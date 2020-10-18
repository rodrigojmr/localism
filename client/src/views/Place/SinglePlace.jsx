import React, { useState, useEffect, useContext, useRef } from 'react';
import { loadPlace } from './../../services/place';
import SinglePlaceMap from './../../components/Map/SinglePlaceMap';
import PlaceInfoWithCarousel from './../../components/Place/PlaceInfoWithCarousel';
import Owner from './../../components/Profile/Owner';

import SupportGrid from './../../components/Support/SupportGrid';
import SupportFromUser from './../../components/Support/SupportFromUser';
import SupportForm from '../../components/Form/SupportForm';
import PlaceSupportSection from '../../components/Support/PlaceSupportSection';

import Modal from '../../components/Modal/Modal';

import UserContext from '../../components/Context/UserContext';
import useOnClick from '../../hooks/useOnClick';

const SinglePlace = props => {
  const [loaded, setLoaded] = useState(false);
  const [place, setPlace] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    const { id } = props.match.params;
    loadPlace(id).then(data => {
      console.log('data: ', data);
      setPlace(data.place);
      setLoaded(true);
    });
  };

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
    support => support.creator._id === currentUser?._id
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
          {currentUser && place.owner._id !== currentUser._id && (
            <PlaceSupportSection
              supported={supported}
              place={place}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          )}
          <Modal modalRef={ref} show={showModal}>
            <SupportForm
              refresh={load}
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
