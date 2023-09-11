import Image from 'next/image'
function Loading() {
    return (<>
    <style jsx>{`
        
        .Loading{
            position:absolute;
            left:50%;
            top:50%;
            width:300px;
            height:400px;
            transform: translate(-50%,-50%);
            font-size: 2rem;
        }
        .fullscreen{
            background-color:var(-back-gd-color);
            width:100vw;
            height:100vh;
        }
    `}</style>
        <div className="fullscreen">
            <div className="Loading">
              <Image src="/loading.gif" alt="My GIF" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
            </div>
        </div>
      </>);
  }
export default Loading;