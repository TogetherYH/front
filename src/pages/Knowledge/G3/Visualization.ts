import { BaseType, Selection, select as d3Select } from 'd3-selection';
import {
  D3ZoomEvent,
  ZoomBehavior,
  zoom as d3Zoom,
  // zoomIdentity
} from 'd3-zoom';

import { ForceSimulation } from './ForceSimulation';
import { GraphGeometryModel } from './GraphGeometryModel';
import { GraphModel } from './m/Graph';
import { GraphStyleModel } from './m/GraphStyle';
import { NodeModel } from './m/Node';
// import { ZoomLimitsReached } from './types';
import {
  node as nodeRenderer,
  relationship as relationshipRenderer,
} from './renderers/init';
import { RelationshipModel } from './m/Relationship';
import { MeasureSizeFn } from './types';
import { nodeMenuRenderer } from './renderers/menu';
import { relationshipEventHandlers } from './mouseEventHandlers';

export class Visualization {
  ZOOM_MIN_SCALE = 0.1;
  ZOOM_MAX_SCALE = 2;
  ZOOM_FIT_PADDING_PERCENT = 0.05;

  private readonly root: Selection<SVGElement, unknown, BaseType, unknown>;
  private baseGroup: Selection<SVGGElement, unknown, BaseType, unknown>;
  private rect: Selection<SVGRectElement, unknown, BaseType, unknown>;
  private container: Selection<SVGGElement, unknown, BaseType, unknown>;
  private geometry: GraphGeometryModel;
  private zoomBehavior: ZoomBehavior<SVGElement, unknown>;
  private zoomMinScaleExtent: number = this.ZOOM_MIN_SCALE;
  private callbacks: Record<
    string,
    undefined | Array<(...args: any[]) => void>
  > = {};

  forceSim: ForceSimulation;

  private draw = false;
  private isZoomClick = false;

  // measureSize (): void({
  //   width: this.svgElement.current?.parentElement?.clientWidth ?? 200,
  //   height: this.svgElement.current?.parentElement?.clientHeight ?? 200
  // })

  constructor(
    element: SVGElement,
    private measureSize: MeasureSizeFn,
    // private onZoomEvent: (limitsReached: ZoomLimitsReached) => void,
    // private onDisplayZoomWheelInfoMessage: () => void,
    private graph: GraphModel,
    public style: GraphStyleModel,
    public isFullscreen: boolean,
  ) {
    this.root = d3Select(element);

    this.isFullscreen = isFullscreen;

    // Remove the base group element when re-creating the visualization
    this.root.selectAll('g').remove();
    this.baseGroup = this.root.append('g').attr('transform', 'translate(0,0)');

    this.rect = this.baseGroup
      .append('rect')
      .style('fill', 'none')
      .style('pointer-events', 'all')
      // Make the rect cover the whole surface, center of the svg viewbox is in (0,0)
      // .attr('x', () => -Math.floor(measureSize().width / 2))
      // .attr('y', () => -Math.floor(measureSize().height / 2))
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('transform', 'scale(1)')
      // Background click event
      // Check if panning is ongoing
      .on('click', () => {
        if (!this.draw) {
          return this.trigger('canvasClicked');
        }
      });

    this.container = this.baseGroup.append('g');
    this.geometry = new GraphGeometryModel(style);

    this.zoomBehavior = d3Zoom<SVGElement, unknown>()
      .scaleExtent([this.zoomMinScaleExtent, this.ZOOM_MAX_SCALE])
      .on('zoom', (e: D3ZoomEvent<SVGElement, unknown>) => {
        // const isZoomClick = this.isZoomClick
        // this.draw = true
        // this.isZoomClick = false
        // const currentZoomScale = e.transform.k
        // const limitsReached: ZoomLimitsReached = {
        //   zoomInLimitReached: currentZoomScale >= this.ZOOM_MAX_SCALE,
        //   zoomOutLimitReached: currentZoomScale <= this.zoomMinScaleExtent
        // }
        // // onZoomEvent(limitsReached)
        // return this.container
        //   .transition()
        //   .duration(isZoomClick ? 400 : 20)
        //   .call(sel => (isZoomClick ? sel.ease(easeCubic) : sel))
        //   .attr('transform', String(e.transform))
      });

    const zoomEventHandler = (
      selection: Selection<SVGElement, unknown, BaseType, unknown>,
    ) => {
      // const handleZoomOnShiftScroll = (e: WheelEvent) => {
      //   const modKeySelected = e.metaKey || e.ctrlKey || e.shiftKey
      //   if (modKeySelected || this.isFullscreen) {
      //     e.preventDefault()
      //     // This is the default implementation of wheelDelta function in d3-zoom v3.0.0
      //     // For some reasons typescript complains when trying to get it by calling zoomBehaviour.wheelDelta() instead
      //     // but it should be the same (and indeed it works at runtime).
      //     // https://github.com/d3/d3-zoom/blob/1bccd3fd56ea24e9658bd7e7c24e9b89410c8967/README.md#zoom_wheelDelta
      //     const delta =
      //       -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 0.002)
      //     return this.zoomBehavior.scaleBy(this.root, 1 + delta)
      //   } else {
      //     onDisplayZoomWheelInfoMessage()
      //   }
      // }
      // return selection
      //   .on('dblclick.zoom', null)
      //   .on('DOMMouseScroll.zoom', handleZoomOnShiftScroll)
      //   .on('wheel.zoom', handleZoomOnShiftScroll)
      //   .on('mousewheel.zoom', handleZoomOnShiftScroll)
    };

    this.root
      .call(this.zoomBehavior)
      .call(zoomEventHandler)
      // Single click is not panning
      .on('click.zoom', () => (this.draw = false));

    this.forceSim = new ForceSimulation(this.render.bind(this));
  }

  private render() {
    this.geometry.onTick(this.graph);

    const nodeGroups = this.container
      .selectAll<SVGGElement, NodeModel>('g.node')
      .attr('transform', (d) => `translate(${d.x},${d.y})`);

    nodeRenderer.forEach((renderer) => nodeGroups.call(renderer.onTick, this));

    const relationshipGroups = this.container
      .selectAll<SVGGElement, RelationshipModel>('g.relationship')
      .attr(
        'transform',
        (d) =>
          `translate(${d.source.x} ${d.source.y}) rotate(${
            d.naturalAngle + 180
          })`,
      );

    relationshipRenderer.forEach((renderer) =>
      relationshipGroups.call(renderer.onTick, this),
    );
  }

  trigger = (event: string, ...args: any[]) => {
    const callbacksForEvent = this.callbacks[event] ?? [];
    callbacksForEvent.forEach((callback) => callback.apply(null, args));
  };

  init(): void {
    console.log('Visualization init');
    this.container
      .selectAll('g.layer')
      .data(['relationships', 'nodes'])
      .join('g')
      .attr('class', (d) => `layer ${d}`);

    this.updateNodes();
    this.updateRelationships();
    this.forceSim.precompute();

    this.adjustZoomMinScaleExtentToFitGraph();
  }

  private updateNodes() {
    const nodes = this.graph.nodes();
    this.geometry.onGraphChange(this.graph, {
      updateNodes: true,
      updateRelationships: false,
    });

    const nodeGroups = this.container
      .select('g.layer.nodes')
      .selectAll<SVGGElement, NodeModel>('g.node')
      .data(nodes, (d) => d.id)
      .join('g')
      .attr('class', 'node')
      .attr('aria-label', (d) => `graph-node${d.id}`)
      // .call(nodeEventHandlers, this.trigger, this.forceSim.simulation)
      .classed('selected', (node) => node.selected);

    nodeRenderer.forEach((renderer) =>
      nodeGroups.call(renderer.onGraphChange, this),
    );

    nodeMenuRenderer.forEach((renderer) =>
      nodeGroups.call(renderer.onGraphChange, this),
    );

    this.forceSim.updateNodes(this.graph);
    this.forceSim.updateRelationships(this.graph);
  }

  private updateRelationships() {
    const relationships = this.graph.relationships();
    this.geometry.onGraphChange(this.graph, {
      updateNodes: false,
      updateRelationships: true,
    });

    const relationshipGroups = this.container
      .select('g.layer.relationships')
      .selectAll<SVGGElement, RelationshipModel>('g.relationship')
      .data(relationships, (d) => d.id)
      .join('g')
      .attr('class', 'relationship')
      .call(relationshipEventHandlers, this.trigger)
      .classed('selected', (relationship) => relationship.selected);

    relationshipRenderer.forEach((renderer) =>
      relationshipGroups.call(renderer.onGraphChange, this),
    );

    this.forceSim.updateRelationships(this.graph);
  }

  private adjustZoomMinScaleExtentToFitGraph = (): void => {
    const scaleAndOffset = this.getZoomScaleFactorToFitWholeGraph();
    const PADDING_FACTOR = 0.75;
    const scaleToFitGraphWithPadding = scaleAndOffset
      ? scaleAndOffset.scale * PADDING_FACTOR
      : this.zoomMinScaleExtent;
    if (scaleToFitGraphWithPadding <= this.zoomMinScaleExtent) {
      this.zoomMinScaleExtent = scaleToFitGraphWithPadding;
      this.zoomBehavior.scaleExtent([
        scaleToFitGraphWithPadding,
        this.ZOOM_MAX_SCALE,
      ]);
    }
  };

  private getZoomScaleFactorToFitWholeGraph = ():
    | { scale: number; centerPointOffset: { x: number; y: number } }
    | undefined => {
    const graphSize = this.container.node()?.getBBox();
    const availableWidth = this.root.node()?.clientWidth;
    const availableHeight = this.root.node()?.clientHeight;

    if (graphSize && availableWidth && availableHeight) {
      const graphWidth = graphSize.width;
      const graphHeight = graphSize.height;

      const graphCenterX = graphSize.x + graphWidth / 2;
      const graphCenterY = graphSize.y + graphHeight / 2;

      if (graphWidth === 0 || graphHeight === 0) return;

      const scale =
        (1 - this.ZOOM_FIT_PADDING_PERCENT) /
        Math.max(graphWidth / availableWidth, graphHeight / availableHeight);

      const centerPointOffset = { x: -graphCenterX, y: -graphCenterY };

      return { scale: scale, centerPointOffset: centerPointOffset };
    }
    return;
  };
}
