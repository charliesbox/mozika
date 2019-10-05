from ariadne import QueryType, convert_kwargs_to_snake_case

query = QueryType()


@query.field("user")
def resolve_user(_, info):
    spotify = info.context["spotify"]
    return spotify.current_user()


@query.field("playlist")
@convert_kwargs_to_snake_case
def resolve_playlist(_, info, playlist_id):
    spotify = info.context["spotify"]
    return spotify.playlist(playlist_id=playlist_id)


@query.field("recommendations")
@convert_kwargs_to_snake_case
def resolve_recommendations(_, info, seed_tracks):
    spotify = info.context["spotify"]
    result = spotify.recommendations(track_ids=seed_tracks)
    return result.tracks


@query.field("topTracks")
def resolve_topTracks(_, info):
    spotify = info.context["spotify"]
    result = spotify.current_user_top_tracks(time_range="medium_term", limit=49)
    return result.items