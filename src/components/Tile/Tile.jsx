import Loading from '../Loading/Loading';

const Tile = (props) => {
  return (
    <div className="relative size-full overflow-auto rounded-2xl shadow-sm bg-gradient-default-dark">
      {props.loading && <Loading />}
      
      <div
        className={`flex size-full flex-col px-6 py-4 ${
          props.loading ? 'hidden' : ''
        }`}
      >
        <div className="flex flex-row justify-between">
          <h1 className="text-[15px] font-semibold dark:text-white">
            {props.title}
          </h1>
        </div>
        <div className="h-full">{props.children}</div>
      </div>
    </div>
  );
};

export default Tile;
