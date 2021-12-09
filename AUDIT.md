# Report

## Inheritance

Contract inherits from `ERC721Enumerable`, `Pausable`, `Ownable` from `@openzeppelin`:

```js
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
```

## Libraries

It uses `Strings` for `uint256`, and `Counters` fro `Counters.Counter`:

```js
using Strings for uint256;
using Counters for Counters.Counter;
```
