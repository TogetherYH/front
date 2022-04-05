import { FC, useState, useRef, useEffect } from 'react';
import { Card, Row, Button, Space } from 'antd';
import { psychosisState, connect, Dispatch, Loading } from 'umi';
import { GraphModel } from './models/Graph';
import { GraphEventHandlerModel } from './GraphVisualizer/Graph/GraphEventHandlerModel';
import { GraphStyleModel } from './models/GraphStyle';
import {
  BasicNode,
  BasicRelationship,
  ZoomInIcon,
  ZoomOutIcon,
  ZoomToFitIcon,
} from './common';
import { GraphStats, mapNodes, mapRelationships } from './utils/mapper';
import { Visualization } from './GraphVisualizer/Graph/visualization/Visualization';
import { StyledVisContainer } from './styled';
import { VizItem } from './types';
import { debounce } from 'lodash';
import {
  StyledSvgWrapper,
  StyledZoomButton,
  StyledZoomHolder,
} from './GraphVisualizer/Graph/styled';
import './style.css';
import {
  ExpandOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';

interface G3Props {
  psychosis: psychosisState;
  loading: boolean;
  dispatch: Dispatch;
}

const G: FC<G3Props> = (props) => {
  const { psychosis, loading, dispatch } = props;

  const svgElement = useRef<SVGSVGElement>();

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [visualization, setVisualization] = useState<Visualization>();
  const [graph, setGraph] = useState<GraphModel>();
  // const [nodes, setNodes] = useState<BasicNode[]>([]);
  const [relationships, setRelationships] = useState<BasicRelationship[]>([]);
  const [selectedItem, setSelectedItem] = useState<VizItem>();
  const [offset, setOffset] = useState<number>(1);
  const [zoomInLimitReached, setZoomInLimitReached] = useState<boolean>(false);
  const [zoomOutLimitReached, setZoomOutLimitReached] =
    useState<boolean>(false);

  const [psy, setPsy] = useState<boolean>(false);
  const [symptom, setSymptom] = useState<boolean>(false);

  useEffect(() => {
    dispatch({
      type: 'psychosis/fetchList',
      payload: {
        name: '',
      },
    });

    if (svgElement.current) {
      // const ns = [
      //   {
      //     id: '1',
      //     labels: ['11'],
      //     properties: {
      //       name: '11',
      //     },
      //     propertyTypes: {
      //     },
      //   },
      //   {
      //     id: '2',
      //     labels: ['22'],
      //     properties: {
      //       name: '22',
      //     },
      //     propertyTypes: {
      //     },
      //   },
      //   {
      //     id: '3',
      //     labels: ['22'],
      //     properties: {
      //       name: '33',
      //     },
      //     propertyTypes: {
      //     },
      //   },
      //   {
      //     id: '4',
      //     labels: ['22'],
      //     properties: {
      //       name: '44',
      //     },
      //     propertyTypes: {
      //     },
      //   },
      //   {
      //     id: '5',
      //     labels: ['22'],
      //     properties: {
      //       name: '55',
      //     },
      //     propertyTypes: {
      //     },
      //   },
      // ];
      // setNodes(ns);
      // const r = [
      //   {
      //     id: '12',
      //     startNodeId: '1',
      //     endNodeId: '2',
      //     type: '4',
      //     properties: {},
      //     propertyTypes: {},
      //   },
      //   {
      //     id: '13',
      //     startNodeId: '1',
      //     endNodeId: '3',
      //     type: '4',
      //     properties: {},
      //     propertyTypes: {},
      //   },
      //   {
      //     id: '14',
      //     startNodeId: '1',
      //     endNodeId: '4',
      //     type: '4',
      //     properties: {},
      //     propertyTypes: {},
      //   },
      //   {
      //     id: '15',
      //     startNodeId: '1',
      //     endNodeId: '5',
      //     type: '4',
      //     properties: {},
      //     propertyTypes: {},
      //   },
      // ];
      // setRelationships(r);
      // setGraph(createGraph(psychosis.nodes, r));
    }
  }, [svgElement]);

  useEffect(() => {
    setGraph(createGraph(psychosis.nodes, relationships));
  }, [psychosis, relationships]);

  useEffect(() => {
    if (graph && svgElement.current) {
      setVisualization(
        new Visualization(
          svgElement.current,
          measureSize,
          // this.handleZoomEvent,
          // this.handleDisplayZoomWheelInfoMessage,
          graph,
          new GraphStyleModel(),
          isFullscreen,
        ),
      );
    }
  }, [graph]);

  useEffect(() => {
    if (graph && visualization) {
      const graphEventHandler = new GraphEventHandlerModel(
        graph,
        visualization,
        // getNodeNeighbours,
        // onItemMouseOver,
        onItemSelect,
        // onGraphModelChange
      );
      graphEventHandler.bindEventHandlers();

      visualization?.init();
    }
  }, [visualization]);

  const createGraph = (
    nodes: BasicNode[],
    relationships: BasicRelationship[],
  ): GraphModel => {
    // console.log('createGraph...', nodes, relationships);
    const graph = new GraphModel();
    graph.addNodes(mapNodes(nodes));
    graph.addRelationships(mapRelationships(relationships, graph));
    // console.log('createGraph end', graph);
    return graph;
  };

  const measureSize = () => ({
    width: svgElement.current?.parentElement?.clientWidth ?? 200,
    height: svgElement.current?.parentElement?.clientHeight ?? 200,
  });

  // const onItemMouseOver = (item: VizItem) => {
  //   this.setHoveredItem(item)
  // }

  // const setHoveredItem = debounce((hoveredItem: VizItem) => {
  //   if (this.mounted) {
  //     this.setState({ hoveredItem })
  //   }
  // }, 200)

  const onItemSelect = (selectedItem: VizItem) => {
    setSelectedItem(selectedItem);
  };

  // const onGraphModelChange = (stats: GraphStats) => {
  //   this.setState({ stats })
  //   if (this.props.updateStyle) {
  //     this.props.updateStyle(this.state.graphStyle.toSheet())
  //   }
  // }

  const zoomInClicked = () => {
    if (visualization) {
      visualization.zoomInClick();
    }
  };

  const zoomOutClicked = () => {
    if (visualization) {
      visualization.zoomOutClick();
    }
  };

  const zoomToFitClicked = () => {
    if (visualization) {
      visualization.zoomToFitClick();
    }
  };

  return (
    <>
      <Card>
        <Row>关键字：</Row>
        <Row>
          <Space>
            标签：
            <Button
              className={psy ? 'psyChecked' : 'psyUnchecked'}
              size="small"
              shape="round"
              onClick={() => {
                setPsy(!psy);
              }}
            >
              精神疾病
            </Button>
            <Button
              className={symptom ? 'symptomChecked' : 'symptomUnchecked'}
              size="small"
              shape="round"
              onClick={() => {
                setSymptom(!symptom);
              }}
            >
              症状
            </Button>
            {/* <CheckableTag key='Psychosis' checked={false} >精神疾病</CheckableTag>
            <CheckableTag key='Symptom' checked={false} >症状</CheckableTag> */}
          </Space>
        </Row>
        <Row>关系：</Row>
      </Card>
      <Card>
        <StyledVisContainer isFullscreen={false}>
          <StyledSvgWrapper>
            <svg className="neod3viz" ref={svgElement} />
            <StyledZoomHolder offset={offset} isFullscreen={isFullscreen}>
              <StyledZoomButton
                aria-label={'zoom-in'}
                className={zoomInLimitReached ? 'faded zoom-in' : 'zoom-in'}
                onClick={zoomInClicked}
              >
                {/* <ZoomInIcon large={isFullscreen} /> */}
                <ZoomInOutlined />
              </StyledZoomButton>
              <StyledZoomButton
                aria-label={'zoom-out'}
                className={zoomOutLimitReached ? 'faded zoom-out' : 'zoom-out'}
                onClick={zoomOutClicked}
              >
                {/* <ZoomOutIcon large={isFullscreen} /> */}
                <ZoomOutOutlined />
              </StyledZoomButton>
              <StyledZoomButton
                aria-label={'zoom-to-fit'}
                onClick={zoomToFitClicked}
              >
                {/* <ZoomToFitIcon large={isFullscreen} /> */}
                <ExpandOutlined />
              </StyledZoomButton>
            </StyledZoomHolder>
          </StyledSvgWrapper>
        </StyledVisContainer>
      </Card>
    </>
  );
};

const mapStateToProps = ({
  psychosis,
  loading,
}: {
  psychosis: psychosisState;
  loading: Loading;
}) => {
  return {
    psychosis,
    psychosisLoading: loading.models.psychosis,
  };
};

export default connect(mapStateToProps)(G);
