import React from 'react';
import SupportWithContent from './../../components/Support/SupportWithContent';
import PlacePreviewSimple from './../../components/Place/PlacePreviewSimple';

const SupportsProfileList = ({ user, supports }) => {
  const supportsWithDescription = supports?.filter(support => support.content);
  const supportsWithoutDescription = supports?.filter(
    support => !support.content
  );

  return (
    <div className="supports">
      {supportsWithDescription && (
        <div className="supports-highlights">
          {supportsWithDescription.map(support => (
            <SupportWithContent
              key={support._id}
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
