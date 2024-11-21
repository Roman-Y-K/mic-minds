import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

import { formatTime } from '@/lib/formatTime';
import { useAudio } from '@/providers/AudioProvider';
import { Button } from '@/components/ui/button';

interface ILatestPodcastItem {
  imageUrl: string;
  title: string;
  podcastId: Id<'podcasts'>;
  views: number;
  duration: number;
  audioUrl: string;
  author: string;
}

const LatestPodcastItem = ({
  imageUrl,
  audioUrl,
  duration,
  title,
  views,
  podcastId,
  author,
}: ILatestPodcastItem) => {
  const router = useRouter();

  const { audio, setAudio, isPlaying } = useAudio();
  const isCurrentlyPlaying = audio?.audioUrl === audioUrl && isPlaying;

  const updatePodcastViews = useMutation(api.podcasts.updatePodcastViews);

  const handleViews = () => {
    router.push(`/podcasts/${podcastId}`, {
      scroll: true,
    });
  };

  const handlePlay = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (isCurrentlyPlaying) {
      setAudio(undefined);
      return;
    }

    setAudio({
      title: title,
      audioUrl,
      imageUrl,
      author,
      podcastId,
    });
    updatePodcastViews({ podcastId });
  };

  return (
    <div
      className="cursor-pointer flex items-center gap-2 w-full border-b-2 border-slate-400 pb-4 rounded-md"
      onClick={handleViews}
    >
      <Image
        src={imageUrl}
        width={80}
        height={80}
        alt={title}
        className="aspect-square object-fit bg-stone-400 rounded-m"
      />
      <div className="flex max-sm:flex-col items-center max-sm:items-start gap-5 max-sm:gap-2 justify-between w-full">
        <h2 className="text-16 truncate font-bold text-white-1 text-ellipsis overflow-hidden ... max-sm:text-wrap w-80">
          {title}
        </h2>
        <div className="flex items-center gap-5 l">
          <figure className="flex gap-3">
            <Image
              src="/icons/headphone.svg"
              width={24}
              height={24}
              alt="headphone"
            />
            <h2 className="text-16 font-bold text-white-1">{views || 0}</h2>
          </figure>
          <figure className="flex gap-3">
            <Image
              src="/icons/watch.svg"
              width={24}
              height={24}
              alt="headphone"
            />
            <h2 className="text-16 font-bold text-white-1">
              {formatTime(duration)}
            </h2>
          </figure>
          <Button
            onClick={handlePlay}
            className="text-16  font-extrabold text-white-1"
          >
            <Image
              src={isCurrentlyPlaying ? '/icons/Pause.svg' : '/icons/Play.svg'}
              width={20}
              height={20}
              alt="random play"
            />{' '}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LatestPodcastItem;
