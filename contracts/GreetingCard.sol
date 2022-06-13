pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./base64.sol";

contract GreetingCard is ERC721 {
    uint256 private _currentTokenId = 0;

    address[] private _signers;

    event SignatureReceived(address from);

    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    function sign(uint256 tokenId) public {
        _signers.push(msg.sender); //todo sign for tokenId
        emit SignatureReceived(msg.sender);
    }

    /**
     * @dev Mints a token to an address with a tokenURI.
     * @param _to address of the future owner of the token
     */
    function mintTo(address _to) public {
        uint256 newTokenId = _getNextTokenId();
        _mint(_to, newTokenId);
        _incrementTokenId();
    }

    /**
     * @dev calculates the next token ID based on value of _currentTokenId
     * @return uint256 for the next token ID
     */
    function _getNextTokenId() private view returns (uint256) {
        return _currentTokenId + 1;
    }

    /**
     * @dev increments the value of _currentTokenId
     */
    function _incrementTokenId() private {
        _currentTokenId++;
    }

    /**
     * @dev return tokenURI, image SVG data in it.
     */

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        string[17] memory parts;
        parts[
            0
        ] = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: white; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="black" /><text x="10" y="20" class="base">';

        /*
        for (uint256 i = 0; i < _signers.length; i++) {
            parts[i * 3 + 1] = '<text x="10" y="20" class="base">';
            parts[i * 3 + 2] = Strings.toHexString(uint160(_signers[i]), 20);
            parts[i * 3 + 3] = "</text></svg>";
        }

        string memory output = string(abi.encodePacked(parts[0]));

        for (uint256 y = 1; y < parts.length - 1; y++) {
            output = string(abi.encodePacked(output, parts[y]));
        }
        */

        parts[1] = Strings.toString(tokenId);

        parts[2] = "</text></svg>";

        string memory output = string(
            abi.encodePacked(parts[0], parts[1], parts[2])
        );

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "Greeting Card #',
                        Strings.toString(tokenId),
                        '", "description": "Greeting Card.", "image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(output)),
                        '"}'
                    )
                )
            )
        );
        output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        return output;
    }
}
