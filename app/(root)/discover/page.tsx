'use client';

import React from 'react';
import { useQuery } from 'convex/react';

import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import Spinner from '@/components/Spinner';
import PodcastCard from '@/components/PodcastCard';
import Searchbar from '@/components/SearchBar';
import { api } from '@/convex/_generated/api';

const Discover = ({
  searchParams: { search },
}: {
  searchParams: { search: string };
}) => {
  const podcastsData = useQuery(api.podcasts.getPodcastBySearch, {
    search: search || '',
  });

  return (
    <div className="flex flex-col gap-9">
      <Searchbar />
      <div className="flex flex-col gap-9">
        <h1 className="text-20 font-bold text-white-1">
          {!search ? 'Discover Trending Podcasts' : 'Search results for '}
          {search && <span className="text-white-2">{search}</span>}
        </h1>
        {podcastsData ? (
          <>
            {podcastsData.length > 0 ? (
              <div className="podcast_grid">
                {podcastsData?.map(
                  ({ _id, podcastTitle, podcastDescription, imageUrl }) => (
                    <PodcastCard
                      key={_id}
                      imgUrl={imageUrl!}
                      title={podcastTitle}
                      description={podcastDescription}
                      podcastId={_id}
                    />
                  )
                )}
              </div>
            ) : (
              <EmptyPlaceholder title="No results found" />
            )}
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Discover;
