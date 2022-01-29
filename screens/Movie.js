import React, { useState } from "react";
import { Dimensions, FlatList } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import { useQuery, useQueryClient } from "react-query";
import { moviesApi } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const ComingSoonTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 10px;
`;
const HSeperator = styled.View`
  height: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };
  const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
    ["movies", "nowPlaying"],
    moviesApi.nowPlaying
  );
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["movies", "trending"],
    moviesApi.trending
  );
  const { isLoading: upComingLoading, data: upComingData } = useQuery(
    ["movies", "upComing"],
    moviesApi.upComing
  );

  const loading = nowPlayingLoading || upComingLoading || trendingLoading;

  const renderHMedia = ({ item }) => (
    <HMedia
      poster_path={item.poster_path}
      original_title={item.original_title}
      release_date={item.release_date}
      overview={item.overview}
      full_data={item}
    ></HMedia>
  );
  const movieKeyExtractor = (item) => item.id + "";

  return loading ? (
    <Loader></Loader>
  ) : upComingData ? (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              width: "100%",
              height: SCREEN_HEIGHT / 4,
              marginBottom: 30,
            }}
          >
            {nowPlayingData
              ? nowPlayingData.results.map((movie) => (
                  <Slide
                    key={movie.id}
                    backdrop_path={movie.backdrop_path || ""}
                    poster_path={movie.poster_path || ""}
                    original_title={movie.original_title}
                    vote_average={movie.vote_average}
                    overview={movie.overview}
                    full_data={movie}
                  ></Slide>
                ))
              : null}
          </Swiper>
          {trendingData ? (
            <HList title="Trending Movies" data={trendingData.results}></HList>
          ) : null}
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        </>
      }
      ItemSeparatorComponent={HSeperator}
      data={upComingData.results}
      keyExtractor={movieKeyExtractor}
      renderItem={renderHMedia}
    ></FlatList>
  ) : null;
};

export default Movies;
