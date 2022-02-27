import React from "react";
import { useSelector } from "react-redux";
import Channel from "./Channel";
const listChannel = [
    {
        _id: "61d1a85d1e5057b3d312e4f6",
        email: "votrieuvy1661@gmail.com",
        name: "Veo CT",
        avatar: "veta/avatars/gpnxsfkymlms75bugjcq",
        followers: Array(1),
    },
    {
        _id: "61d030167da9b948fafdba19",
        email: "nguyenminhnhat301101@gmail.com",
        avatar: "veta/avatars/kavmrmwq3tmylxewu5xt",
        name: "Minh Nhat",
        followers: Array(1),
    },
];

function ListChat({ socket }) {
    const user = useSelector((state) => state.user.current);

    // const joinChannel = (data) => {
    // 	const channelID = data._id + user._id;
    // 	socket.emit('join_channel', '123');
    // };

    return (
        <div className="py-4 max-h-[68.4rem]">
            <span className="dark:text-textColorDark text-3xl ">
                Recently Chat
            </span>
            <div className="flex flex-col mt-4 -mx-4 max-h-[56rem] space-y-4 overflow-y-scroll scrollbar px-4">
                {listChannel &&
                    listChannel.map((channel, index) => (
                        <div
                            // onClick={() => joinChannel(channel)}
                            key={index}
                            className="flex-1 p-4 bg-slate-100 dark:bg-indigo-850 rounded-lg hover:bg-slate-400 dark:hover:opacity-70 hover:pointer "
                        >
                            <Channel user={channel} />
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default ListChat;
