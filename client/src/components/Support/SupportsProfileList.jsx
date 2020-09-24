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
    supportsWithDescription = supports.filter(
      support => support.content === '' || supports.content === undefined
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
      <div className="supports-row">
        {supportsWithDescription.map(({ place }) => (
          <PlacePreviewSimple place={place} />
        ))}
      </div>
    </div>
  );
};

export default SupportsProfileList;
