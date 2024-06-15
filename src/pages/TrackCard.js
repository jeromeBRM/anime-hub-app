const TrackCard = (props) => {
  return (
    <a className="track-card" href={ props.track?.external_urls.spotify } target="_blank" rel="noreferrer">
      <img className="track-card__cover" src={ props.track?.album.images[0].url } alt=""/>
      <div className="track-card__info">
        <div className="track-card__name">{ props.track?.name }</div>
        <div className="track-card__author" style={{ fontStyle: "italic" }}>{ props.track?.artists[0].name }</div>
      </div>
    </a>
  );
};

export default TrackCard;