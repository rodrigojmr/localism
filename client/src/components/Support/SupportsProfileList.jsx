import React from 'react';
import SupportWithContent from './../../components/Support/SupportWithContent';
import PlacePreviewSimple from './../../components/Place/PlacePreviewSimple';

const SupportsProfileList = ({ user, supports }) => {
  let supportsWithDescription;
  let supportsWithoutDescription;
  if (supports) {
    supportsWithDescription = supports.filter(
      support => support.content !== ''
    );
    supportsWithoutDescription = supports.filter(
      support => support.content === '' || support.content === undefined
    );
  }

  return (
    <div className="supports">
      {supportsWithDescription && (
        <div className="supports-highlights">
          {supportsWithDescription.map(support => (
            <SupportWithContent
              place={support.place}
              content={support.content}
            />
          ))}
        </div>
      )}
      {supportsWithoutDescription.length > 0 && (
        <div className="supports-row">
          {supportsWithoutDescription.map(({ place }) => (
            <PlacePreviewSimple place={place} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SupportsProfileList;
