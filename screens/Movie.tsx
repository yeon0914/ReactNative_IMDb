import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import Poster from "../components/Poster";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import {
  QueryClient,
  useQuery,
  useQueryClient,
  useQueryErrorResetBoundary,
} from "react-query";
import { moviesApi, MovieResponse } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const ListContainer = styled.View`
  margin-bottom: 40px;
`;
const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;
const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;
const ComingSoonTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 10px;
`;
const VSeperator = styled.View`
  width: 20px;
`;
const HSeperator = styled.View`
  height: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);
  const {
    isLoading: upComingLoading,
    data: upComingData,
    isRefetching: isRefetchingUpComing,
  } = useQuery<MovieResponse>(["movies", "upComing"], moviesApi.upComing);

  const loading = nowPlayingLoading || upComingLoading || trendingLoading;

  const renderVMedia = ({ item }) => (
    <VMedia
      poster_path={item.poster_path}
      original_title={item.original_title}
      vote_average={item.vote_average}
    ></VMedia>
  );
  const renderHMedia = ({ item }) => (
    <HMedia
      poster_path={item.poster_path}
      original_title={item.original_title}
      release_date={item.release_date}
      overview={item.overview}
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
