import { BtcNetwork } from "."

export type BtcNetwork = (typeof BtcNetwork)[keyof typeof BtcNetwork]
