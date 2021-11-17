# Gift Exchange Pair Selector

## Setup
The main program logic can be found on [`randomPairs.ts`](./randomPairs.ts). It's a typescript file with no dependencies.

In order to run the tests [`randomPairs.test.ts`](./randomPairs.test.ts) or the CLI [`exchange.ts`](./exchange.ts), you need to install [Deno](https://deno.land/#installation)

## CLI Usage
This project was build with [Deno](https://deno.land/#installation), and you need to install it in order to run it.


`deno run exchange.ts name1 name2 name3 ... nameN`

### Examples

```shell
> deno run exchange.ts jane karl tina may
jane gives a gift to karl
karl gives a gift to tina
tina gives a gift to may
may gives a gift to jane
```

```shell
> deno run exchange.ts
Usage:
deno run exchange.ts name1 name2 name3 ... nameN

At least 3 names are required, and no repetitions are allowed.
```

```shell
> deno run exchange.ts john clair
Please pass at least 3 names.
```

```shell
> deno run exchange.ts jane jane karl tina
You have duplicate names on your list. Please remove the duplicate or rename them.
```
