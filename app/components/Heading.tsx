interface HeadingProps{
    title:string,
    center?:boolean
}

const Heading:React.FC<HeadingProps>=({title,center})=>{
    return (<div className={center? "text-center":"text-start"}>
        <h1 className="font-bold text-2x1">{title}</h1>
    </div>
    );
};
export default Heading;