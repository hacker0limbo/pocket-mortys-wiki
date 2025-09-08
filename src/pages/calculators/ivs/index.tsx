import { View, Text, Image, ScrollView } from "@tarojs/components";
import {
  Button,
  Cell,
  Form,
  Input,
  Popup,
  Radio,
  SafeArea,
  Space,
  Table,
  TableColumnProps,
  VirtualList,
} from "@nutui/nutui-react-taro";
import { useEffect, useMemo, useState } from "react";
import { parseMortyName } from "@/utils";
import { getMortys, type Morty } from "@/api/database";
import Taro from "@tarojs/taro";
import { ArrowRight } from "@nutui/icons-react-taro";
import { POCKET_MORTYS_MEDIA_URL } from "@/api/request";
import { getIVs, getPerfectIVsTableData } from "./helpers";

import "./index.scss";

type FormValues = {
  evs: string;
  lvl: string;
  hpStat: string;
  atkStat: string;
  defStat: string;
  spdStat: string;
  hpEV: string;
  atkEV: string;
  defEV: string;
  spdEV: string;
};

type Result = {
  hp: number;
  atk: number;
  def: number;
  spd: number;
  level: number;
  hpMin: number;
  hpMax: number;
  atkMin: number;
  atkMax: number;
  defMin: number;
  defMax: number;
  spdMin: number;
  spdMax: number;
};

function parseResult(rMin?: number, rMax?: number) {
  let r: string;

  if (!rMin || !rMax || rMin < 0 || rMax < 0) {
    return "暂未查询到 IV 值";
  }

  if (rMin === rMax) {
    r = rMin.toString();
  } else {
    r = `${rMin} ~ ${rMax}`;
  }

  return r;
}

export default function () {
  const [form] = Form.useForm();
  const [result, setResult] = useState<Result>();
  const [mortys, setMortys] = useState<Morty[]>([]);
  const [selectedMortyAssetId, setSelectedMortyAssetId] = useState<string>("");
  const [showMortyList, setShowMortyList] = useState(false);
  const selectedMorty = useMemo(
    () => mortys.find((m) => m.assetid === selectedMortyAssetId),
    [mortys, selectedMortyAssetId]
  );
  const evsValue = Form.useWatch("evs", form);
  const [showPerfectIVsTable, setShowPerfectIVsTable] = useState(false);
  const PerfectIVsTableData = useMemo(() => {
    if (selectedMorty) {
      const { baseatk, basedef, basehp, basespd } = selectedMorty;
      return getPerfectIVsTableData({ hpBase: basehp, atkBase: baseatk, defBase: basedef, spdBase: basespd });
    }
    return [];
  }, [selectedMorty]);

  const columns: TableColumnProps[] = [
    {
      key: "level",
      title: "Level",
    },
    {
      key: "hp",
      title: "HP",
    },
    {
      key: "atk",
      title: "ATK",
    },
    {
      key: "def",
      title: "DEF",
    },
    {
      key: "spd",
      title: "SPD",
    },
  ];

  useEffect(() => {
    Taro.showLoading({
      title: "加载莫蒂列表中...",
      mask: true,
    });
    getMortys()
      .then((res) => {
        const ms = res.result?.data?.data;
        setMortys(ms);
        // 默认选中第一个
        setSelectedMortyAssetId(ms[0]?.assetid);
      })
      .catch(() => {
        Taro.showToast({
          title: "加载莫蒂列表失败",
          icon: "error",
        });
      })
      .finally(() => {
        Taro.hideLoading();
      });
  }, []);

  return (
    <View>
      <Cell.Group>
        <Cell
          clickable
          onClick={() => {
            setShowMortyList(true);
          }}
          title="用于计算的莫蒂"
          extra={
            <Space>
              <Space>
                {selectedMorty ? <Text>#{selectedMorty?.number}</Text> : null}
                {selectedMorty ? (
                  <Image
                    src={`${POCKET_MORTYS_MEDIA_URL}/assets/${selectedMorty?.assetid}Icon.png`}
                    style={{ width: 18 }}
                    mode="widthFix"
                  />
                ) : null}
                <Text>{parseMortyName(selectedMorty?.name) || "请选择一个莫蒂"}</Text>
              </Space>
              <ArrowRight />
            </Space>
          }
        />
        <Cell
          title="该莫蒂的完美IV表格"
          extra={<ArrowRight />}
          clickable
          onClick={() => {
            if (!selectedMorty) {
              Taro.showToast({
                title: "请先选择一个莫蒂",
                icon: "error",
              });
            } else {
              setShowPerfectIVsTable(true);
            }
          }}
        />
      </Cell.Group>
      <Form
        initialValues={{
          evs: "0",
        }}
        divider
        labelPosition="left"
        starPosition="right"
        form={form}
        onFinish={(values: FormValues) => {
          const { evs, lvl, hpStat, atkStat, defStat, spdStat, hpEV, atkEV, defEV, spdEV } = values;
          const { baseatk, basedef, basehp, basespd } = selectedMorty || {};
          const isCustom = evs === "custom";

          const r = getIVs({
            hpStat: Number(hpStat),
            atkStat: Number(atkStat),
            defStat: Number(defStat),
            spdStat: Number(spdStat),
            hpBase: Number(basehp),
            atkBase: Number(baseatk),
            defBase: Number(basedef),
            spdBase: Number(basespd),
            hpEV: isCustom ? Number(hpEV) : Number(evs),
            atkEV: isCustom ? Number(atkEV) : Number(evs),
            defEV: isCustom ? Number(defEV) : Number(evs),
            spdEV: isCustom ? Number(spdEV) : Number(evs),
            lvl: Number(lvl),
          });
          setResult(r);
        }}
        footer={
          <View style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
            <Button block type="success" nativeType="submit">
              查询
            </Button>
            <Button block type="default" nativeType="reset">
              重置
            </Button>
          </View>
        }
      >
        <Form.Item name="evs" label="EVs" required rules={[{ required: true, message: "请选择 evs" }]}>
          <Radio.Group
            direction="horizontal"
            options={[
              {
                label: "Min (0)",
                value: "0",
              },
              {
                label: "Max (65536)",
                value: "65536",
              },
              {
                label: "Custom",
                value: "custom",
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="lvl" label="Level" required rules={[{ required: true, message: "请输入等级" }]}>
          <Input type="number" placeholder="请输入等级" />
        </Form.Item>
        <Form.Item name="hpStat" label="HP" required rules={[{ required: true, message: "请输入 HP" }]}>
          <Input type="number" placeholder="请输入 HP" />
        </Form.Item>
        {evsValue === "custom" ? (
          <Form.Item name="hpEV" label="HP-EV" required rules={[{ required: true, message: "请输入 HP-EV" }]}>
            <Input type="number" placeholder="请输入 HP-EV" />
          </Form.Item>
        ) : null}
        <Form.Item name="atkStat" label="Attack" required rules={[{ required: true, message: "请输入 Attack" }]}>
          <Input type="number" placeholder="请输入 Attack" />
        </Form.Item>
        {evsValue === "custom" ? (
          <Form.Item name="atkEV" label="Attack-EV" required rules={[{ required: true, message: "请输入 Attack-EV" }]}>
            <Input type="number" placeholder="请输入 Attack-EV" />
          </Form.Item>
        ) : null}
        <Form.Item name="defStat" label="Defense" required rules={[{ required: true, message: "请输入 Defense" }]}>
          <Input type="number" placeholder="请输入 Defense" />
        </Form.Item>
        {evsValue === "custom" ? (
          <Form.Item
            name="defEV"
            label="Defense-EV"
            required
            rules={[{ required: true, message: "请输入 Defense-EV" }]}
          >
            <Input type="number" placeholder="请输入 Defense-EV" />
          </Form.Item>
        ) : null}
        <Form.Item name="spdStat" label="Speed" required rules={[{ required: true, message: "请输入 Speed" }]}>
          <Input type="number" placeholder="请输入 Speed" />
        </Form.Item>
        {evsValue === "custom" ? (
          <Form.Item name="spdEV" label="Speed-EV" required rules={[{ required: true, message: "请输入 Speed-EV" }]}>
            <Input type="number" placeholder="请输入 Speed-EV" />
          </Form.Item>
        ) : null}
      </Form>

      <Cell.Group title="查询结果">
        <Cell title="HP-IV" extra={parseResult(result?.hpMin, result?.hpMax)} />
        <Cell title="Attack-IV" extra={parseResult(result?.atkMin, result?.atkMax)} />
        <Cell title="Defense-IV" extra={parseResult(result?.defMin, result?.defMax)} />
        <Cell title="Speed-IV" extra={parseResult(result?.spdMin, result?.spdMax)} />
      </Cell.Group>

      <Popup
        visible={showMortyList}
        position="bottom"
        title="请选择莫蒂"
        closeable
        onClose={() => {
          setShowMortyList(false);
        }}
      >
        <ScrollView style={{ maxHeight: 600, padding: 16, boxSizing: "border-box" }} scrollY>
          <Cell.Group>
            <VirtualList
              list={mortys}
              itemHeight={40}
              itemRender={({ assetid, name, number }: Morty, index) => (
                <Cell
                  title={
                    <Space>
                      <Text>#{number}</Text>
                      <Image
                        src={`${POCKET_MORTYS_MEDIA_URL}/assets/${assetid}Icon.png`}
                        style={{ width: 18 }}
                        mode="widthFix"
                      />
                      <Text>{parseMortyName(name)}</Text>
                    </Space>
                  }
                  extra={
                    <Radio
                      value={assetid}
                      key={assetid}
                      checked={selectedMortyAssetId === assetid}
                      onChange={(c) => {
                        if (c) {
                          setSelectedMortyAssetId(assetid);
                        } else {
                          setSelectedMortyAssetId("");
                        }
                      }}
                    />
                  }
                />
              )}
            />
          </Cell.Group>
        </ScrollView>
      </Popup>

      <Popup
        visible={showPerfectIVsTable}
        position="bottom"
        title={`${parseMortyName(selectedMorty?.name)}完美IV表格`}
        closeable
        onClose={() => {
          setShowPerfectIVsTable(false);
        }}
      >
        <ScrollView style={{ maxHeight: 600, padding: 16, boxSizing: "border-box" }} scrollY>
          <Table style={{ boxSizing: "border-box" }} data={PerfectIVsTableData} columns={columns} />
          <SafeArea position="bottom" />
        </ScrollView>
      </Popup>

      <SafeArea position="bottom" />
    </View>
  );
}
