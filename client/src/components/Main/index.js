import Home from '../../features/Home';
function Container({ type }) {
	return (
		<div className="flex w-full lg:px-[7.4rem] xl:px-[27rem] justify-center h-full pt-[8.6rem]  px-4">
			<div className={`flex h-full w-full justify-center z-10`}>
				{type === 'home' && <Home />}
			</div>
		</div>
	);
}

export default Container;
