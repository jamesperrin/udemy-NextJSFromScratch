'use client';

import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
} from 'react-share';

const ShareButtons = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">Share This Property:</h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton
          url={shareUrl}
          quote={property.name}
          hashtag={`#${property.type.replace(/\s/g, '')}ForRent`}>
          <span title="Share on Facebook">
            <FacebookIcon size={40} round={true} />
          </span>
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={property.name}
          hashtags={[`${property.type.replace(/\s/g, '')}ForRent`]}>
          <span title="Share on X AKA Twitter">
            <TwitterIcon size={40} round={true} />
          </span>
        </TwitterShareButton>

        <EmailShareButton url={shareUrl} subject={property.name} body={`Check out this property listing: ${shareUrl}`}>
          <span title="Share via email">
            <EmailIcon size={40} round={true} />
          </span>
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareButtons;
