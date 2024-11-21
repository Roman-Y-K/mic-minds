'use client';
import React from 'react';
import { useQuery } from 'convex/react';
import { Loader } from 'lucide-react';

import PodcastCard from '@/components/PodcastCard';
import LatestPodcastItem from '@/components/LatestPodcastItem';
import { api } from '@/convex/_generated/api';

const Home = () => {
  const trendingPodcasts = useQuery(api.podcasts.getTrendingPodcasts);
  const latestPodcasts = useQuery(api.podcasts.getLatestPodcasts);

  return (
    <div className="mt-9 flex flex-col gap-9">
      {(!trendingPodcasts?.length || !latestPodcasts?.length) && (
        <Loader
          className="animate-spin ml-auto mr-auto text-orange-1"
          size={50}
        />
      )}
      {trendingPodcasts?.length && (
        <section className="flex flex-col gap-5">
          <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>

          <div className="podcast_grid">
            {trendingPodcasts?.map(
              ({ _id, podcastTitle, podcastDescription, imageUrl }) => (
                <PodcastCard
                  key={_id}
                  imgUrl={imageUrl as string}
                  title={podcastTitle}
                  description={podcastDescription}
                  podcastId={_id}
                />
              )
            )}
          </div>
        </section>
      )}

      {latestPodcasts?.length && (
        <section className="flex flex-col gap-5">
          <h1 className="text-20 font-bold text-white-1">Latest Podcasts</h1>

          <div className="flex flex-col gap-5">
            {latestPodcasts?.map((item) => {
              const {
                _id,
                podcastTitle,
                audioDuration,
                author,
                audioUrl,
                views,
                imageUrl,
              } = item;
              return (
                <LatestPodcastItem
                  audioUrl={audioUrl}
                  key={_id}
                  duration={audioDuration}
                  imageUrl={imageUrl as string}
                  title={podcastTitle}
                  views={views}
                  author={author}
                  podcastId={_id}
                />
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
