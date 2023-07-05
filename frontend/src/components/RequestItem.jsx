function RequestItem({ request }) {
  return (
    <div className='request'>
      <h3>{request.name}</h3>
      <h3>{request._id}</h3>
      <h3>{request.createdAt}</h3>
    </div>
  );
}
export default RequestItem;
