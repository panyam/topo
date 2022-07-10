import * as TSU from "@panyam/tsutils";

/**
 * Types of connectors.
 */
export enum ConnectorType {
  NORTH,
  EAST,
  SOUTH,
  WEST,
  CENTER,
}

/**
 * Connectors define where in a block can connections terminate.
 * These are "points" within a block and the points are usually defined as
 * percentages of the block's width/height.
 */
export class Connector {
  /**
   * Establishes a new connector type.  A connector is specific to each Node.
   * @param parent    The block this connector belongs to.
   * @param type      The location of the connector and where it can belong on the Node.
   * @param xpct      The x coordinate of the connector within the Node as
   *                  a percentage of Node's width.
   * @param ypct      The y coordinate of the connector within the Node as
   *                  a percentage of Node's height.
   * @param dir       Whether the connector allows inbound connections or
   *                  outbound connections or both.
   *                  -1 = Inbound
   *                  1 => Outbound
   *                  0 => bidirectional
   */
  public constructor(
    public readonly parent: Block,
    public readonly index: number,
    public readonly type: ConnectorType,
    public readonly xpct: number,
    public readonly ypct: number,
    public readonly dir = 0,
  ) {}
}

export interface Block {
  readonly uuid: number;
  x: number;
  y: number;
  width: number;
  height: number;
  image: string;
  title: string;
  connectors: Connector[];

  // Any child blocks
  children: Block[];

  // Links between blocks within this Block (or to/from this block)
  links: Link[];

  layout: (block: Block) => void;
}

export interface Link {
  readonly uuid: number;
  source: Block;
  target: Block;
  sourceConnector: number;
  targetConnector: number;

  /**
   * Called when link needs to be redrawn either due to source/target
   * location changes or link styles changed.
   */
  redraw: (link: Link) => void;
}
