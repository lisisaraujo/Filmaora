const MoviesList = () => {
    const { loading, error, data } = useQuery(GET_MOVIES);

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>Error: {error.message}</Text>;

    return (
        <View>
            {data.movies.map((movie) => (
                <View key={movie.id}>
                    <Text>{movie.title}</Text>
                    <Text>{movie.overview}</Text>
                </View>
            ))}
        </View>
    );
};

export default MoviesList