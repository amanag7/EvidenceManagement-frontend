import ipfsClient from "ipfs-http-client";

const node = new ipfsClient({
	url: process.env.REACT_APP_IPFS_GATEWAY || "https://ipfs.infura.io:5001/",
});

const addFile = (file) => node.add(file).then((res) => res.path);

export default {
	addFile,
};
