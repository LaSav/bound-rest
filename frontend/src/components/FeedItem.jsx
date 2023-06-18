function FeedItem({ listing }) {
  return (
    <div className='listing'>
      <h2>{listing.text}</h2>
    </div>
  );
}

export default FeedItem;
