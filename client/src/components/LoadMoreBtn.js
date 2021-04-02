const LoadMoreBtn = ({ result, page, load, handleLoadMore }) => {
	return (
		<>
			{result < 9 * (page - 1)
				? ''
				: !load && (
						<button className="mx-auto btn btn-dark d-block" onClick={handleLoadMore}>
							SHOW MORE
						</button>
				  )}
		</>
	)
}

export default LoadMoreBtn
