import { FC, useState, useRef, useEffect } from 'react';
import {
  Card,
  Row,
  Button,
  Space,
  Select,
  Form,
  Input,
  notification,
} from 'antd';
import { queryState, connect, Dispatch, Loading } from 'umi';
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

const { Option } = Select;

interface G3Props {
  query: queryState;
  loading: boolean;
  dispatch: Dispatch;
}

const G: FC<G3Props> = (props) => {
  const { query, loading, dispatch } = props;

  const svgElement = useRef<SVGSVGElement>();

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [visualization, setVisualization] = useState<Visualization>();
  const [graph, setGraph] = useState<GraphModel>();
  // const [nodes, setNodes] = useState<BasicNode[]>([]);
  // const [relationships, setRelationships] = useState<BasicRelationship[]>([]);
  const [selectedItem, setSelectedItem] = useState<VizItem>();
  const [offset, setOffset] = useState<number>(1);
  const [zoomInLimitReached, setZoomInLimitReached] = useState<boolean>(false);
  const [zoomOutLimitReached, setZoomOutLimitReached] =
    useState<boolean>(false);

  // const [psy, setPsy] = useState<boolean>(false);
  // const [symptom, setSymptom] = useState<boolean>(false);

  const [searchForm] = Form.useForm();
  const [hasSymptom, setHasSymptom] = useState<boolean>(false);
  const [needCheck, setNeedCheck] = useState<boolean>(false);
  const [hasTreat, setHasTreat] = useState<boolean>(false);
  const [recommendDrug, setRecommendDrug] = useState<boolean>(false);

  useEffect(() => {
    // dispatch({
    //   type: 'query/fetchQuery',
    //   payload: {
    //     name: '',
    //   },
    // });

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
    if (query.nodes && query.nodes.length > 0) {
      setGraph(createGraph(query.nodes, query.relationships));
    }
    // console.log('qqq', query);
  }, [query.nodes, query.relationships]);

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

      visualization.init();

      visualization.update({
        updateNodes: true,
        updateRelationships: true,
        restartSimulation: true,
      });
    }
  }, [visualization]);

  useEffect(() => {
    console.log('xxxx');
    queryHandler();
  }, [hasTreat, needCheck, hasSymptom, recommendDrug]);

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

  const queryHandler = () => {
    // console.log('hasSymptom: ', hasSymptom);
    // console.log('needCheck: ', needCheck);
    // console.log('hasTreat: ', hasTreat);

    if (
      !searchForm.getFieldValue('label') ||
      !searchForm.getFieldValue('keyword')
    ) {
      notification.warning({
        message: '??????????????????????????????',
      });
      return;
    }

    dispatch({
      type: 'query/fetchQuery',
      payload: {
        label: searchForm.getFieldValue('label'),
        keyword: searchForm.getFieldValue('keyword'),
        relationship: `${hasSymptom ? 'HasSymptom,' : ''}${
          needCheck ? 'NeedCheck,' : ''
        }${hasTreat ? 'HasTreat,' : ''}${
          recommendDrug ? 'RecommendDrug,' : ''
        }`,
      },
    });
  };

  const relationChangeHandler = (func: Function, state: boolean) => {
    func(!state);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card>
        <Form form={searchForm}>
          <Space direction="vertical">
            <Row>
              <Space>
                <Form.Item
                  label="??????"
                  name="label"
                  style={{ marginBottom: '0' }}
                >
                  <Select style={{ width: 120 }}>
                    <Option key="Psychosis" value="Psychosis">
                      ????????????
                    </Option>
                    <Option key="Symptom" value="Symptom">
                      ??????
                    </Option>
                    <Option key="Check" value="Check">
                      ????????????
                    </Option>
                    <Option key="Treat" value="Treat">
                      ????????????
                    </Option>
                    <Option key="Drug" value="Drug">
                      ????????????
                    </Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="??????"
                  name="keyword"
                  style={{ marginBottom: '0' }}
                >
                  <Input allowClear />
                </Form.Item>
                <Button type="primary" onClick={queryHandler}>
                  ??????
                </Button>
              </Space>
            </Row>
            <Row>
              <Space>
                <label title="??????">
                  ??????<span style={{ marginLeft: '2px' }}>:</span>
                </label>
                <Button
                  className={
                    hasSymptom ? 'hasSymptomChecked' : 'hasSymptomUnchecked'
                  }
                  size="small"
                  shape="round"
                  onClick={() => {
                    relationChangeHandler(setHasSymptom, hasSymptom);
                  }}
                >
                  ??????
                </Button>
                <Button
                  className={
                    needCheck ? 'needCheckChecked' : 'needCheckUnchecked'
                  }
                  size="small"
                  shape="round"
                  onClick={() => {
                    // setNeedCheck(!needCheck);
                    relationChangeHandler(setNeedCheck, needCheck);
                  }}
                >
                  ????????????
                </Button>
                <Button
                  className={hasTreat ? 'hasTreatChecked' : 'hasTreatUnchecked'}
                  size="small"
                  shape="round"
                  onClick={() => {
                    relationChangeHandler(setHasTreat, hasTreat);
                  }}
                >
                  ????????????
                </Button>
                <Button
                  className={
                    recommendDrug
                      ? 'recommendDrugChecked'
                      : 'recommendDrugUnchecked'
                  }
                  size="small"
                  shape="round"
                  onClick={() => {
                    relationChangeHandler(setRecommendDrug, recommendDrug);
                  }}
                >
                  ????????????
                </Button>
              </Space>
            </Row>
          </Space>
        </Form>
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
    </Space>
  );
};

const mapStateToProps = ({
  query,
  loading,
}: {
  query: queryState;
  loading: Loading;
}) => {
  return {
    query,
    psychosisLoading: loading.models.query,
  };
};

export default connect(mapStateToProps)(G);
