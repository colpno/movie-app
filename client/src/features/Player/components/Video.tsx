import { useLoaderData } from 'react-router-dom';

import { Response } from '~/apis/video/getTrailer.ts';

interface Loader {
  trailer?: Response['data']['results'][0];
}

function Video() {
  const { trailer } = useLoaderData() as Loader;

  if (!trailer) return <span>Nothing</span>;

  const getSource = () => {
    switch (trailer.site.toLowerCase()) {
      case 'youtube':
        return `https://www.youtube.com/embed/${trailer.key}`;
      default:
        return '';
    }
  };

  const source = getSource();

  if (!source) return <span>Invalid source</span>;

  return (
    <div className="flex items-center justify-center size-full">
      <iframe
        width="560"
        height="315"
        src={source}
        title={trailer.name}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Video;
