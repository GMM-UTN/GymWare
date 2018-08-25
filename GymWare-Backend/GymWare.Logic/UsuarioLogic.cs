using GymWare.DataAccess.DAL;
using GymWare.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GymWare.Entities.DTO;

namespace GymWare.Logic
{
    public class UsuarioLogic
    {
        private UsuarioRepository _us = new UsuarioRepository();
        
        public Usuario CheckUsuario(UsuarioLoginDTO usuarioLoginDTO)
        {
            Usuario cliente = _us.CheckCliente(usuarioLoginDTO);
            if (cliente != null)
            {
                return cliente;
            }
            else
            {
                Usuario empleado = _us.CheckEmpleado(usuarioLoginDTO);
                if (empleado != null)
                {
                    return empleado;
                }
                else
                {
                    return null;
                }
            }
        }
        public bool Insert(Cliente cliente)
        {
            return _us.Insert(cliente);
        }
    }
}
