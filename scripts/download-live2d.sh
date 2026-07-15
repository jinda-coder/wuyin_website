#!/bin/bash
# 下载 mai 看板娘模型文件到 public/live2d/mai/
# 用法: bash scripts/download-live2d.sh

BASE_URL="https://cdn.jsdelivr.net/gh/evrstr/live2d-widget-models/live2d_evrstr/mai"
OUT_DIR="public/live2d/mai"

mkdir -p "$OUT_DIR/mtn" "$OUT_DIR/umaru2048" "$OUT_DIR/voice"

download() {
    local rel="$1"
    local url="$BASE_URL/$rel"
    local dest="$OUT_DIR/$rel"
    if [ -f "$dest" ]; then
        echo "[skip] $rel"
        return
    fi
    echo "[dl]   $rel"
    curl -fsSL "$url" -o "$dest" || echo "[FAIL] $rel  <- 请手动重试"
}

# model.json 本体
download "model.json"

# 核心资源
download "physics.json"
download "umaru.moc"
download "umaru2048/texture_00.png"

# 动作文件
download "mtn/umaru_idle.mtn"
for i in $(seq 1 34); do
    download "mtn/rita_Live2D_$(printf '%03d' $i).mtn"
done

# 语音文件
for i in $(seq 1 34); do
    download "voice/$(printf '%02d' $i).wav"
done

echo ""
echo "=== 完成，验证文件数量 ==="
find "$OUT_DIR" -type f | wc -l
echo "预期: 72 个文件（1 model.json + 1 physics + 1 moc + 1 png + 35 mtn + 34 wav）"
