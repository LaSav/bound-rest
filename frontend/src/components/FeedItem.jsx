function FeedItem({ listing }) {
  return (
    <div className='listing'>
      <h2>{listing.text}</h2>
      <h3>required skill: {listing.requiredSkill}</h3>
    </div>
  );
}

export default FeedItem;
