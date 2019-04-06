import NextJsLink from 'next/link';

const assetPrefix = process.env.ASSET_PREFIX || '';

const Link = ({ href, ...rest }) => (
  <NextJsLink href={href} as={`${assetPrefix}${href}`} {...rest} />
);

export default Link;
