function FeedItem({ listing }) {
  return (
    <div className='listing'>
      <h2>{listing.text}</h2>
      <h3>required skill: {listing.requiredSkill}</h3>
      <h4>Created by: {listing.user}</h4>
    </div>
  );
}

export default FeedItem;
