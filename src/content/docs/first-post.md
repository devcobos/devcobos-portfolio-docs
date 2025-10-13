---
title: "First post"
description: "Lorem ipsum dolor sit amet"
pubDate: "Jul 08 2022"
tags: ["Ejemplo", "Docu"]
---

# Docker en WSL2 sin Docker Desktop

## 📋 Información general

> **Entorno testeado:** Windows 11 con Ubuntu 24.04 en WSL2  
> **Última actualización:** Julio 2025

Esta guía detalla la instalación y configuración de Docker en WSL2 (Subsistema de Windows para Linux) sin Docker Desktop. Es una alternativa ligera, libre de licencias propietarias y que ofrece mayor control sobre el entorno de desarrollo.

**¿Por qué esta configuración?**

- **Docker:** Plataforma para contenedorización que simplifica el desarrollo, despliegue y distribución de aplicaciones
- **WSL2:** Entorno Linux completo integrado en Windows que permite ejecutar servicios nativos de Linux
- **Sin Docker Desktop:** Evita dependencias propietarias y mejora el rendimiento

## 1. 🛠️ Instalación de WSL2

Sigue el [manual oficial de instalación de WSL](https://learn.microsoft.com/es-es/windows/wsl/install-manual) para configurar WSL2 en tu sistema.

**Verificar la instalación:**

```shell
wsl -l -v
```

> ⚠️ **Importante:** Asegúrate de que tu distribución esté ejecutándose en WSL2 y que tu distribución de Linux (por ejemplo, Ubuntu) está correctamente instalada y activa.

## 2. ⚙️ Configurar WSL para usar systemd y limpiar el $PATH

Para que servicios como Docker se inicien automáticamente al arrancar WSL, necesitas habilitar `systemd`.
Además, desactivaremos la inclusión automática de rutas de Windows en el `$PATH` de Linux para evitar conflictos entre binarios de ambos entornos.

Desde la terminal de Ubuntu en WSL, ejecuta el siguiente comando:

```bash
sudo tee /etc/wsl.conf <<EOF
[boot]
systemd = true
[interop]
appendWindowsPath = false
EOF
```

**Aplicar cambios reiniciando WSL:**

```shell
wsl --shutdown
```

Al volver a abrir Ubuntu en WSL, `systemd` estará activo y tu entorno Linux no incluirá rutas de Windows por defecto.

## 3. 🐳 Instalación de Docker en Ubuntu

Estos pasos están extraídos de la [documentación oficial de Docker](https://docs.docker.com/engine/install/ubuntu/).

Para instalar Docker, abre la terminal en Ubuntu y ejecuta:

```bash
sudo apt-get update && sudo apt-get upgrade -y

# Añadir la clave GPG oficial de Docker:
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Agregar el repositorio de Docker:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo \"${UBUNTU_CODENAME:-$VERSION_CODENAME}\") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

# Instalar los paquetes de Docker:
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Una vez instalado Docker, ejecuta los siguientes comandos para poder usar Docker sin escribir `sudo` cada vez, y para que Docker se inicie automáticamente al arrancar el sistema:

```bash
# Añadir tu usuario al grupo 'docker':
sudo usermod -aG docker $USER

# Habilitar Docker con systemd:
sudo systemctl enable --now docker.service
```

Para aplicar los cambios, cierra tu sesión de WSL y vuelve a iniciarla ejecutando:

```shell
wsl --shutdown
```

Finalmente, verifica que Docker funciona correctamente ejecutando:

```bash
docker run hello-world
```

Este comando descargará y ejecutará una imagen de prueba, mostrando un mensaje de confirmación si todo está bien configurado.

## 4. 🌐 Configurar Docker para exponerlo a Windows

Edita el archivo de configuración del daemon de Docker:

```bash
sudo nano /etc/docker/daemon.json
```

Añade el siguiente contenido:

```json
{
  "hosts": ["tcp://0.0.0.0:2375", "unix:///var/run/docker.sock"]
}
```

Luego, crea un archivo de sobreescritura para el servicio Docker:

```bash
sudo mkdir -p /lib/systemd/system/docker.service.d
sudo nano /lib/systemd/system/docker.service.d/override.conf
```

Introduce el siguiente contenido:

```txt title="override.conf"
[Service]
ExecStart=
ExecStart=/usr/bin/dockerd
```

Reinicia los servicios para aplicar los cambios:

```bash
sudo systemctl daemon-reexec
sudo systemctl restart docker
```

Por último, desde Windows, reinicia WSL:

```shell
wsl --shutdown
```

## 5. 🎮 Configurar Docker con NVIDIA (Opcional)

> 📚 **Documentación oficial:** [NVIDIA Container Toolkit Installation Guide](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)

**Agregar repositorio:**

```bash
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
  && curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
    sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
    sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
```

**Instalar toolkit:**

```bash
sudo apt-get update
export NVIDIA_CONTAINER_TOOLKIT_VERSION=1.17.8-1
sudo apt-get install -y \
    nvidia-container-toolkit=${NVIDIA_CONTAINER_TOOLKIT_VERSION} \
    nvidia-container-toolkit-base=${NVIDIA_CONTAINER_TOOLKIT_VERSION} \
    libnvidia-container-tools=${NVIDIA_CONTAINER_TOOLKIT_VERSION} \
    libnvidia-container1=${NVIDIA_CONTAINER_TOOLKIT_VERSION}
```

**Configurar runtime:**

```bash
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
```

**Verificar instalación:**

```bash
docker run --rm --gpus all nvidia/cuda:12.3.0-base-ubuntu22.04 nvidia-smi
```

## 6. 💻 Usar Docker CLI en PowerShell de Windows

Para facilitar el uso de Docker desde PowerShell sin instalar los binarios de Docker para Windows, puedes crear una función que redirija los comandos a WSL.

Abre tu perfil de PowerShell ejecutando:

```powershell
notepad $PROFILE
```

Añadiremos el siguiente contenido al final de nuestro fichero:

```powershell title="Microsoft.PowerShell_profile.ps1"
function docker {
    wsl -d Ubuntu-24.04 -e true >$null 2>&1
    wsl docker @args
}
```

Guarda el archivo, cierra y reinicia PowerShell. Luego, verifica que Docker funciona con:

```shell
docker --version
```
